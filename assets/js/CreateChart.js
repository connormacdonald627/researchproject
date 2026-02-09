export function CreateChart(SelectedElementID, Title, Datasets, Labels, Type = "line") {
  const Container = document.querySelector(`#${SelectedElementID}`);
  if (!Container) {
    console.error(`No element found for selector "${SelectedElementID}"`);
    return;
  }


  const ChartContainer = document.createElement('div');
  const Canvas = document.createElement("canvas");
  const TitleElement = document.createElement('h1');
  TitleElement.textContent = Title;
  ChartContainer.appendChild(TitleElement);
  ChartContainer.appendChild(Canvas);
  Container.appendChild(ChartContainer);
  Canvas.style.width = "100%";
  Canvas.style.height = "100%";
  Canvas.style.minHeight = "500px";
  Canvas.style.maxHeight = "500px";

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
        x: { ticks: { color: "white" }, grid: { color: "#555" } },
        y: {
          ticks: { color: "white" },
          grid: { color: "#555" },
          beginAtZero: true,
        },
      },
    },
  };

  const NewChart = new Chart(Canvas, Config);
  return NewChart;
}
