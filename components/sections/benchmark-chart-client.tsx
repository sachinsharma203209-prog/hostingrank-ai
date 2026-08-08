"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export type ChartKind = "ttfb" | "uptime" | "latency" | "performance";

export interface ChartProvider {
  name: string;
  globalTtfb: number;
  uptime: number;
  performanceScore: number;
  latency: { india: number; usa: number; uk: number };
}

const primaryColor = "#004ac6";
const accentColor = "#2563eb";
const emeraldColor = "#10B981";

export function ChartClient({ kind, providers }: { kind: ChartKind; providers: ChartProvider[] }) {
  if (providers.length === 0) return null;

  const names = providers.map((p) => p.name);

  function chartOption() {
    switch (kind) {
      case "ttfb":
        return {
          tooltip: { trigger: "axis" as const },
          grid: { left: 48, right: 16, top: 16, bottom: 56 },
          xAxis: {
            type: "category" as const,
            data: names,
            axisLabel: { interval: 0, rotate: 30, color: "#475569", fontSize: 11 },
          },
          yAxis: {
            type: "value" as const,
            name: "ms",
            axisLabel: { color: "#64748b" },
            splitLine: { lineStyle: { color: "#e2e8f0" } },
          },
          series: [
            {
              name: "Global TTFB",
              type: "bar" as const,
              data: providers.map((p) => Math.round(p.globalTtfb)),
              itemStyle: { color: primaryColor, borderRadius: [4, 4, 0, 0] },
              barWidth: "60%",
            },
          ],
        };
      case "uptime":
        return {
          tooltip: { trigger: "axis" as const },
          grid: { left: 64, right: 16, top: 16, bottom: 56 },
          xAxis: {
            type: "category" as const,
            data: names,
            axisLabel: { interval: 0, rotate: 30, color: "#475569", fontSize: 11 },
          },
          yAxis: {
            type: "value" as const,
            min: 99.6,
            max: 100,
            axisLabel: { color: "#64748b", formatter: "{value}%" },
            splitLine: { lineStyle: { color: "#e2e8f0" } },
          },
          series: [
            {
              name: "Uptime",
              type: "bar" as const,
              data: providers.map((p) => Number(p.uptime.toFixed(2))),
              itemStyle: { color: emeraldColor, borderRadius: [4, 4, 0, 0] },
              barWidth: "60%",
            },
          ],
        };
      case "latency":
        return {
          tooltip: { trigger: "axis" as const },
          legend: { data: ["India", "USA", "UK"], bottom: 0, textStyle: { color: "#475569" } },
          grid: { left: 48, right: 16, top: 24, bottom: 80 },
          xAxis: {
            type: "category" as const,
            data: names,
            axisLabel: { interval: 0, rotate: 30, color: "#475569", fontSize: 11 },
          },
          yAxis: {
            type: "value" as const,
            name: "ms",
            axisLabel: { color: "#64748b" },
            splitLine: { lineStyle: { color: "#e2e8f0" } },
          },
          series: [
            {
              name: "India",
              type: "bar" as const,
              data: providers.map((p) => Math.round(p.latency.india)),
              itemStyle: { color: primaryColor, borderRadius: [4, 4, 0, 0] },
            },
            {
              name: "USA",
              type: "bar" as const,
              data: providers.map((p) => Math.round(p.latency.usa)),
              itemStyle: { color: accentColor, borderRadius: [4, 4, 0, 0] },
            },
            {
              name: "UK",
              type: "bar" as const,
              data: providers.map((p) => Math.round(p.latency.uk)),
              itemStyle: { color: "#a5b4fc", borderRadius: [4, 4, 0, 0] },
            },
          ],
        };
      case "performance":
      default:
        return {
          tooltip: { trigger: "axis" as const },
          grid: { left: 48, right: 16, top: 16, bottom: 56 },
          xAxis: {
            type: "category" as const,
            data: names,
            axisLabel: { interval: 0, rotate: 30, color: "#475569", fontSize: 11 },
          },
          yAxis: {
            type: "value" as const,
            min: 0,
            max: 100,
            axisLabel: { color: "#64748b" },
            splitLine: { lineStyle: { color: "#e2e8f0" } },
          },
          series: [
            {
              name: "Performance",
              type: "line" as const,
              smooth: true,
              symbolSize: 7,
              data: providers.map((p) => p.performanceScore),
              lineStyle: { color: primaryColor, width: 3 },
              itemStyle: { color: primaryColor },
              areaStyle: { color: "rgba(0, 74, 198, 0.08)" },
            },
          ],
        };
    }
  }

  return <ReactECharts option={chartOption()} style={{ height: "100%", width: "100%" }} notMerge />;
}
