import { GetComponent } from "../../js/GetComponent.js";

export default async function Header(
  SelectedElementID,
  Title,
  HasMenu,
  Links = [],
) {
  const HeaderContainer = await GetComponent(
    "./assets/components/header/Header.html",
    SelectedElementID,
  );

  const Header = HeaderContainer.querySelector("#header");
  const HeaderTitle = HeaderContainer.querySelector("#title");
  const MenuButton = HeaderContainer.querySelector("#menu-button");
  const Dropdown = HeaderContainer.querySelector("#menu-dropdown");
  const LinksContainer = HeaderContainer.querySelector("#links");

  HeaderTitle.textContent = Title;

  if (!HasMenu) {
    MenuButton.classList.add("hidden");
    Header.classList.add("center");
  } else {
    Links.forEach((Link) => {
      const ListElement = document.createElement("li");
      const LinkElement = document.createElement("a");

      LinkElement.href = Link.URL;
      LinkElement.textContent = Link.Text;

      ListElement.appendChild(LinkElement);
      LinksContainer.appendChild(ListElement);
    });
  }

  MenuButton.addEventListener("click", (Event) => {
    Dropdown.classList.toggle("hidden");
  });
}
