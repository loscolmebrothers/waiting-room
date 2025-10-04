export function setCursor(event, cursor) {
  const stage = event.target.getStage();
  stage.container().style.cursor = cursor;
}
