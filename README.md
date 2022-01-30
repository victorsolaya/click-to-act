# PCF - Click to Act 

This PCF will try to replicate the same exact behaviour as the Communication Channel Control that is on the Phone text fields.
As at the moment is not possible to modify the standard CIClickToAct function, this replicates the same exact behaviour.
In the case you need to update the Javascript because it is not what you expect, the only thing you need to do is change the function inside the TextField onClickAction

```js
function onClickAction() {
    var entityId = "";
    try {
        //@ts-ignore
        entityId = (context.page as any).entityId || "";
    } catch (error) { console.log(error); }
    var value = context.parameters.value;
    var data = {
        value: value.raw,
        name: (value.attributes as any).LogicalName,
        format: (value.attributes as any).Format,
        entityLogicalName: (value.attributes as any).EntityLogicalName,
        entityId: entityId,
    };
    var event = new CustomEvent("CIClickToAct", { detail: data });
    window.dispatchEvent(event);
    return true;
}

```