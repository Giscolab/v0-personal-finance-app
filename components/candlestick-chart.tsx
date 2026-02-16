"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface OHLCData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

interface CandlestickChartProps {
  data: OHLCData[]
  title?: string
  className?: string
  showVolume?: boolean
}

export function CandlestickChart({ data, title, className = "", showVolume = false }: CandlestickChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    chartInstance.current = echarts.init(chartRef.current)

    const dates = data.map((d) => d.date)
    const ohlcData = data.map((d) => [d.open, d.close, d.low, d.high])
    const volumeData = data.map((d) => d.volume || 0)

    const option = {
      title: title
        ? {
            text: title,
            textStyle: { fontSize: 16, fontWeight: "normal" },
          }
        : undefined,
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" },
        formatter: (params: any) => {
          const candleData = params.find((p: any) => p.seriesName === "OHLC")
          if (!candleData) return ""

          const [open, close, low, high] = candleData.data
          const date = candleData.name
          const volume = volumeData[candleData.dataIndex]

          return `
            <div style="font-size: 12px;">
              <div><strong>${date}</strong></div>
              <div>Ouverture: €${open.toFixed(2)}</div>
              <div>Fermeture: €${close.toFixed(2)}</div>
              <div>Plus haut: €${high.toFixed(2)}</div>
              <div>Plus bas: €${low.toFixed(2)}</div>
              ${showVolume ? `<div>Volume: ${volume}</div>` : ""}
            </div>
          `
        },
      },
      xAxis: {
        type: "category",
        data: dates,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: [
        {
          type: "value",
          position: "right",
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: { color: "#f1f5f9", type: "dashed" },
          },
          axisLabel: {
            formatter: (value: number) => `€${value.toFixed(0)}`,
          },
        },
        ...(showVolume
          ? [
              {
                type: "value",
                position: "left",
                max: Math.max(...volumeData) * 4,
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
              },
            ]
          : []),
      ],
      series: [
        {
          name: "OHLC",
          type: "candlestick",
          data: ohlcData,
          itemStyle: {
            color: "#ef4444",
            color0: "#22c55e",
            borderColor: "#ef4444",
            borderColor0: "#22c55e",
          },
        },
        ...(showVolume
          ? [
              {
                name: "Volume",
                type: "bar",
                yAxisIndex: 1,
                data: volumeData,
                itemStyle: {
                  color: "rgba(139, 92, 246, 0.3)",
                },
              },
            ]
          : []),
      ],
      grid: {
        left: "3%",
        right: "8%",
        bottom: showVolume ? "15%" : "3%",
        top: "10%",
        containLabel: true,
      },
    }

    chartInstance.current.setOption(option)

    const handleResize = () => chartInstance.current?.resize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chartInstance.current?.dispose()
    }
  }, [data, title, showVolume])

  return <div ref={chartRef} className={`w-full h-full ${className}`} />
}
