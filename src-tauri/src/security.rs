use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use argon2::password_hash::{rand_core::OsRng, SaltString};
use aes_gcm::{Aes256Gcm, Key, Nonce, aead::{Aead, NewAead, generic_array::GenericArray}};
use rand::RngCore;
use base64::{Engine as _, engine::general_purpose};
use sha2::{Sha256, Digest};
use anyhow::{Result, anyhow};

pub struct SecurityManager {
    argon2: Argon2<'static>,
}

impl SecurityManager {
    pub fn new() -> Self {
        SecurityManager {
            argon2: Argon2::default(),
        }
    }

    pub fn derive_key(&self, password: &str) -> Result<[u8; 32]> {
        use pbkdf2::pbkdf2_hmac;
        use sha2::Sha256;
        
        let salt = b"finance_app_salt_2024"; // In production, use random salt per database
        let mut key = [0u8; 32];
        
        pbkdf2_hmac::<Sha256>(password.as_bytes(), salt, 200_000, &mut key);
        
        Ok(key)
    }

    pub fn encrypt(&self, data: &str, key: &[u8; 32]) -> Result<String> {
        let key = Key::from_slice(key);
        let cipher = Aes256Gcm::new(key);
        
        let mut nonce_bytes = [0u8; 12];
        OsRng.fill_bytes(&mut nonce_bytes);
        let nonce = Nonce::from_slice(&nonce_bytes);
        
        let ciphertext = cipher
            .encrypt(nonce, data.as_bytes())
            .map_err(|e| anyhow!("Encryption failed: {}", e))?;
        
        // Combine nonce and ciphertext
        let mut result = nonce_bytes.to_vec();
        result.extend_from_slice(&ciphertext);
        
        Ok(general_purpose::STANDARD.encode(&result))
    }

    pub fn decrypt(&self, encrypted_data: &str, key: &[u8; 32]) -> Result<String> {
        let data = general_purpose::STANDARD
            .decode(encrypted_data)
            .map_err(|e| anyhow!("Failed to decode encrypted data: {}", e))?;
        
        if data.len() < 12 {
            return Err(anyhow!("Invalid encrypted data length"));
        }
        
        let (nonce_bytes, ciphertext) = data.split_at(12);
        let nonce = Nonce::from_slice(nonce_bytes);
        
        let key = Key::from_slice(key);
        let cipher = Aes256Gcm::new(key);
        
        let plaintext = cipher
            .decrypt(nonce, ciphertext)
            .map_err(|e| anyhow!("Decryption failed: {}", e))?;
        
        String::from_utf8(plaintext)
            .map_err(|e| anyhow!("Failed to convert decrypted data to string: {}", e))
    }

    pub fn create_hash(&self, data: &str) -> Result<String> {
        let mut hasher = Sha256::new();
        hasher.update(data.as_bytes());
        let result = hasher.finalize();
        Ok(hex::encode(result))
    }

    pub fn verify_password(&self, password: &str, hash: &str) -> Result<bool> {
        let parsed_hash = PasswordHash::new(hash)
            .map_err(|e| anyhow!("Failed to parse hash: {}", e))?;
        
        Ok(self.argon2.verify_password(password.as_bytes(), &parsed_hash).is_ok())
    }

    pub fn generate_secure_id(&self) -> String {
        uuid::Uuid::new_v4().to_string()
    }
}
