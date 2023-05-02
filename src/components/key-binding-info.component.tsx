function KeyBindingInfo({
  keyCode,
  action,
}: {
  keyCode: string;
  action: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 text-neutral-950">
      <span className="uppercase">&lt;{keyCode}&gt;:</span>
      <span className="capitalize">{action}</span>
    </div>
  );
}

export default KeyBindingInfo;
