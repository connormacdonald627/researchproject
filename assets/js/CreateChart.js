export function CreateChart(
  SelectedElementID,
  Datasets,
  Labels,
  Type = "line",
  XAxisTitle = "",
  YAxisTitle = ""
) {
  const Container = document.querySelector(`#${SelectedElementID}`);
  if (!Container) {
    console.error(`No element found for selector "${SelectedElementID}"`);
    return;
  }

  const Canvas = document.createElement("canvas");
  Container.appendChild(Canvas);
  Canvas.style.width = "100%";
  Canvas.style.height = "100%";
  Canvas.style.minHeight = "400px";

  const Config = {
    type: Type,
    data: {
      labels: Labels,
      datasets: Datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "white" } },
      },
      scales: {
        x: {
          ticks: { color: "white" },
          grid: { color: "#555" },
          title: { display: !!XAxisTitle, text: XAxisTitle, color: "white" },
        },
        y: {
          ticks: { color: "white" },
          grid: { color: "#555" },
          beginAtZero: true,
          title: { display: !!YAxisTitle, text: YAxisTitle, color: "white" },
        },
      },
    },
  };

  return new Chart(Canvas, Config);
}