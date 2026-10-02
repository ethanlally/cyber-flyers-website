export function initializeTeamFinders() {
  document.querySelectorAll<HTMLElement>("[data-finder]").forEach((finder) => {
    const choices = finder.querySelector<HTMLElement>(".finder-choices");
    if (choices) choices.hidden = false;
    finder.querySelectorAll<HTMLElement>("[data-result]").forEach((result) => {
      result.hidden = result.dataset.result !== "cmac";
    });
    finder
      .querySelectorAll<HTMLButtonElement>("[data-interest]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          finder
            .querySelectorAll<HTMLButtonElement>("[data-interest]")
            .forEach((choice) => {
              const active = choice === button;
              choice.setAttribute("aria-pressed", String(active));
              choice.classList.toggle("selected", active);
            });
          finder
            .querySelectorAll<HTMLElement>("[data-result]")
            .forEach((result) => {
              result.hidden = result.dataset.result !== button.dataset.interest;
            });
        });
      });
  });
}
