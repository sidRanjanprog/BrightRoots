import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PRIMARY_CHART_COLOR = "rgb(59,130,246)";

// =============================
// Screen Time Chart
// =============================

export const getScreenTimeChart = (screenTimes) => {
  const sortedScreenTimes = [...screenTimes].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = {
    labels: sortedScreenTimes.map((record) =>
      new Date(record.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    ),

    datasets: [
      {
        label: "Screen Time",
        data: sortedScreenTimes.map((record) => record.durationMinutes),

        borderColor: PRIMARY_CHART_COLOR,
        backgroundColor: PRIMARY_CHART_COLOR,

        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 7,

        pointBackgroundColor: PRIMARY_CHART_COLOR,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,

        tension: 0.35,

        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} mins`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#6B7280",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 20,
          color: "#6B7280",
        },

        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  return {
    chartData,
    chartOptions,
  };
};

// =============================
// Sleep Chart
// =============================

export const getSleepChart = (sleepRecords) => {
  const sortedSleepRecords = [...sleepRecords].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = {
    labels: sortedSleepRecords.map((record) =>
      new Date(record.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    ),

    datasets: [
      {
        label: "Sleep",
        data: sortedSleepRecords.map((record) => record.sleepHours),

        borderColor: PRIMARY_CHART_COLOR,
        backgroundColor: PRIMARY_CHART_COLOR,

        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 7,

        pointBackgroundColor: PRIMARY_CHART_COLOR,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,

        tension: 0.35,

        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} hours`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#6B7280",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 1,
          color: "#6B7280",
        },

        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  return {
    chartData,
    chartOptions,
  };
};

// =============================
// Outdoor Activity Chart
// =============================

export const getOutdoorChart = (outdoorActivities) => {
  const sortedOutdoorActivities = [...outdoorActivities].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = {
    labels: sortedOutdoorActivities.map((record) =>
      new Date(record.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    ),

    datasets: [
      {
        label: "Outdoor Activity",
        data: sortedOutdoorActivities.map((record) => record.durationMinutes),

        borderColor: PRIMARY_CHART_COLOR,
        backgroundColor: PRIMARY_CHART_COLOR,

        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 7,

        pointBackgroundColor: PRIMARY_CHART_COLOR,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,

        tension: 0.25,

        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} mins`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#6B7280",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 20,
          color: "#6B7280",
        },

        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  return {
    chartData,
    chartOptions,
  };
};
