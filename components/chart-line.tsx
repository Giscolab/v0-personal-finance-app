"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface ChartLineProps {
  data: { x: string | number; y: number }[]
  title?: string
  className?: string
}

export function ChartLine({ data, title, className = "" }: ChartLineProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current)

    const option = {
      title: title
        ? {
            text: title,
            textStyle: {
              fontSize: 16,
              fontWeight: "normal",
            },
          }
        : undefined,
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          const point = params[0]
          return `${point.name}: €${point.value.toLocaleString()}`
        },
      },
      xAxis: {
        type: "category",
        data: data.map((d) => d.x),
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: {
            color: "#f1f5f9",
            type: "dashed",
          },
        },
        axisLabel: {
          formatter: (value: number) => `€${value.toLocaleString()}`,
        },
      },
      series: [
        {
          data: data.map((d) => d.y),
          type: "line",
          smooth: true,
          lineStyle: {
            width: 3,
            color: "#8b5cf6",
          },
          itemStyle: {
            color: "#8b5cf6",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(139, 92, 246, 0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(139, 92, 246, 0.05)",
                },
              ],
            },
          },
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
    }

    chartInstance.current.setOption(option)

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chartInstance.current?.dispose()
    }
  }, [data, title])

  return <div ref={chartRef} className={`w-full h-full ${className}`} />
}
