"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface CalendarData {
  date: string
  value: number
}

interface CalendarHeatmapProps {
  data: CalendarData[]
  year: number
  title?: string
  className?: string
}

export function CalendarHeatmap({ data, year, title, className = "" }: CalendarHeatmapProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    chartInstance.current = echarts.init(chartRef.current)

    const maxValue = Math.max(...data.map((d) => Math.abs(d.value)))

    const option = {
      title: title
        ? {
            text: title,
            textStyle: { fontSize: 16, fontWeight: "normal" },
          }
        : undefined,
      tooltip: {
        formatter: (params: any) => {
          const date = new Date(params.data[0])
          const value = params.data[1]
          return `${date.toLocaleDateString("fr-FR")}<br/>Dépenses: €${Math.abs(value).toFixed(2)}`
        },
      },
      visualMap: {
        min: 0,
        max: maxValue,
        type: "piecewise",
        orient: "horizontal",
        left: "center",
        top: "top",
        pieces: [
          { min: 0, max: maxValue * 0.2, color: "#f1f5f9" },
          { min: maxValue * 0.2, max: maxValue * 0.4, color: "#e2e8f0" },
          { min: maxValue * 0.4, max: maxValue * 0.6, color: "#cbd5e1" },
          { min: maxValue * 0.6, max: maxValue * 0.8, color: "#94a3b8" },
          { min: maxValue * 0.8, max: maxValue, color: "#64748b" },
        ],
        textStyle: { fontSize: 12 },
      },
      calendar: {
        top: 80,
        left: 30,
        right: 30,
        cellSize: ["auto", 20],
        range: year.toString(),
        itemStyle: {
          borderWidth: 0.5,
          borderColor: "#fff",
        },
        yearLabel: { show: false },
        monthLabel: {
          nameMap: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
        },
        dayLabel: {
          nameMap: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        },
      },
      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: data.map((d) => [d.date, Math.abs(d.value)]),
        },
      ],
    }

    chartInstance.current.setOption(option)

    const handleResize = () => chartInstance.current?.resize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chartInstance.current?.dispose()
    }
  }, [data, year, title])

  return <div ref={chartRef} className={`w-full h-full ${className}`} />
}
