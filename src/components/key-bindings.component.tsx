import KeyBindingInfo from "./key-binding-info.component";

const key_bindings = [
  {
    keyCode: "Space",
    action: "To jump",
  },
  {
    keyCode: "w or ArrowUp",
    action: "To move forward",
  },
  {
    keyCode: "a or ArrowLeft",
    action: "To move left",
  },
  {
    keyCode: "s or ArrowDown",
    action: "To move backward",
  },
  {
    keyCode: "d or ArrowRight",
    action: "To move right",
  },
  {
    keyCode: "1 esc",
    action: "To free the mouse",
  },
  {
    keyCode: "2 esc",
    action: "To pause the game",
  },
  {
    keyCode: "click",
    action: "To add a cube",
  },
  {
    keyCode: "alt + click",
    action: "To remove a cube",
  },
];

function KeyBindings() {
  return (
    <p className="text-sm text-left text-opacity-80">
      {key_bindings.map((keyBinding) => (
        <KeyBindingInfo key={keyBinding.keyCode} {...keyBinding} />
      ))}
    </p>
  );
}

export default KeyBindings;
