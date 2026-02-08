export async function GetComponent(HTMLFilePath, ElementID) {
  try {
    const Response = await fetch(HTMLFilePath);

    if (!Response.ok) {
      throw new Error(
        `Failed to fetch component from ${HTMLFilePath}: ${Response.statusText}`,
      );
    }

    const HtmlContent = await Response.text();
    const SelectedElement = document.getElementById(ElementID);

    SelectedElement.innerHTML = HtmlContent;

    // Handle scripts inside the component
    const Scripts = SelectedElement.getElementsByTagName("script");

    for (const Script of Scripts) {
      let ShouldLoad = true;

      if (Script.src) {
        const ExistingScripts = document.querySelectorAll(
          `script[src="${Script.src}"]`,
        );
        if (ExistingScripts.length > 0) {
          ShouldLoad = false;
        }
      }

      if (!ShouldLoad) continue;

      if (Script.src && Script.type === "module") {
        try {
          await import(Script.src);
          continue;
        } catch (Error) {
          console.error(`Error loading module ${Script.src}:`, Error);
        }
      }

      const NewScript = document.createElement("script");

      if (Script.src) {
        NewScript.src = Script.src;
      } else {
        NewScript.textContent = Script.textContent;
      }

      document.head.appendChild(NewScript);
      document.head.removeChild(NewScript);
    }

    return SelectedElement;
  } catch (Error) {
    console.error("Error loading component:", Error);
    return null;
  }
}
