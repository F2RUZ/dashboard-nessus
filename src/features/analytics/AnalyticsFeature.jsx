// src/features/analytics/AnalyticsFeature.jsx
"use client";
import * as React from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  Stack,
  useTheme,
} from "@mui/joy";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

// --- MOCK DATA (Ma'lumotlar bazasi o'rniga) ---
const growthData = [
  { name: "Yan", users: 400, active: 240 },
  { name: "Fev", users: 300, active: 139 },
  { name: "Mar", users: 500, active: 380 },
  { name: "Apr", users: 780, active: 590 },
  { name: "May", users: 1090, active: 800 },
  { name: "Iyun", users: 1390, active: 1100 },
  { name: "Iyul", users: 1890, active: 1300 },
];

const genderData = [
  { name: "Erkaklar", value: 540 },
  { name: "Ayollar", value: 620 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Kichik yordamchi karta komponenti
function StatCard({ title, value, icon, color }) {
  return (
    <Card variant="outlined">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography level="body-sm" textColor="text.tertiary">
            {title}
          </Typography>
          <Typography level="h3">{value}</Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: "50%",
            bgcolor: `${color}.100`,
            color: `${color}.600`,
            display: "flex",
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Card>
  );
}

export default function AnalyticsFeature() {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Typography level="h2" mb={1}>
        Analitika
      </Typography>
      <Typography level="body-md" color="neutral" mb={3}>
        Platforma ko'rsatkichlari va statistikasi.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {/* 1. KPI KARTALAR */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid xs={12} sm={4}>
          <StatCard
            title="Jami Foydalanuvchilar"
            value="12,345"
            icon={<PeopleAltRoundedIcon />}
            color="primary"
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <StatCard
            title="O'rtacha O'sish"
            value="+24%"
            icon={<TrendingUpRoundedIcon />}
            color="success"
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <StatCard
            title="Sessiya Vaqti"
            value="4m 32s"
            icon={<AccessTimeFilledRoundedIcon />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* 2. ASOSIY GRAFIKLAR */}
      <Grid container spacing={3}>
        {/* A. User Growth (Line Chart) */}
        <Grid xs={12} lg={8}>
          <Card variant="outlined" sx={{ height: 400 }}>
            <Typography level="title-lg" mb={3}>
              Foydalanuvchilar O'sishi (2024)
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={growthData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="Ro'yxatdan o'tganlar"
                  stroke={theme.palette.primary[500]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  name="Faol Foydalanuvchilar"
                  stroke={theme.palette.success[500]}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* B. Gender Distribution (Pie Chart) */}
        <Grid xs={12} lg={4}>
          <Card variant="outlined" sx={{ height: 400 }}>
            <Typography level="title-lg" mb={3}>
              Auditoriya (Jinsi bo'yicha)
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* C. Monthly Activity (Bar Chart) - Qo'shimcha */}
        <Grid xs={12}>
          <Card variant="outlined" sx={{ height: 350 }}>
            <Typography level="title-lg" mb={3}>
              Oylik Faollik (Bar)
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={growthData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="users"
                  fill={theme.palette.primary[400]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
