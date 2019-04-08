let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: ["1 2 3", "4 5 6", "7 8 9", "{down} 0 {backspace}"]
  },
  display: {
    "{down}": "▼"
  },
  theme: "hg-theme-default hg-layout-numeric numeric-theme",
  mergeDisplay: true
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);
}

/**
 * Handle keyboard press
 */
document.addEventListener("keydown", event => {
  highlightButton(event);
});

document.addEventListener("keyup", event => {
  unhighlightButton(event);
});

function highlightButton(event) {
  let layoutKeyName = keyboard.physicalKeyboardInterface.getSimpleKeyboardLayoutKey(
    event
  );

  /**
   * removing numpad from string
   */
  if (layoutKeyName.includes("numpad")) {
    layoutKeyName = layoutKeyName.replace("numpad", "");
  }

  let buttonElement =
    keyboard.getButtonElement(layoutKeyName) ||
    keyboard.getButtonElement(`{${layoutKeyName}}`);

  if (!buttonElement) {
    console.log("Could not find button in layout", layoutKeyName);
    return false;
  }

  buttonElement.style.background = "#9ab4d0";
  buttonElement.style.color = "white";
}

function unhighlightButton(event) {
  let layoutKeyName = keyboard.physicalKeyboardInterface.getSimpleKeyboardLayoutKey(
    event
  );

  /**
   * removing numpad from string
   */
  if (layoutKeyName.includes("numpad")) {
    layoutKeyName = layoutKeyName.replace("numpad", "");
  }

  let buttonElement =
    keyboard.getButtonElement(layoutKeyName) ||
    keyboard.getButtonElement(`{${layoutKeyName}}`);

  if (!buttonElement) {
    console.log("Could not find button in layout", layoutKeyName);
    return false;
  }

  buttonElement.removeAttribute("style");
}
