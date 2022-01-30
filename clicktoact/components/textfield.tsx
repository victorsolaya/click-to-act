import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { IInputs } from '../generated/ManifestTypes';
import { IconButton } from '@fluentui/react';
interface ITextFieldInputComponent {
    context: ComponentFramework.Context<IInputs>,
    _changeHandler: (event: any) => void;
}
const TextFieldComponent = ({ context, _changeHandler }: ITextFieldInputComponent) => {
    const PHONE_INPUT_ID_SEED = "phone-text-input";
    /**
     * String which is assigned as an icon id
     */
    const PHONE_ACTION_ICON_ID_SEED = "phone-action-icon";
    /**
     * String which is assigned as a container id
     */
    const PHONE_CONTAINER_ID_SEED = "phone-container";
    /**
     * String which is assigned as a aria-descriptor id
     */
    const PHONE_ARIA_DESCRIPTOR_ID_SEED =
        "phone-input-aria-descriptor";
    function isControlDisabled() {
        return (
            context?.mode?.isControlDisabled ||
            !context.parameters?.value?.security?.editable ||
            (context as any).page && ((context as any).page.isPageReadOnly)
        );
    }
    function onInputKeyDown(event: any) {
        if (!event) { return; }
        switch (event.keyCode) {
            case 13 /*Enter*/:
                if (event.ctrlKey) {

                    // CTRL + ENTER triggers the action
                    onClickAction();
                }
                break;
            default:
                break;
        }
    }
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

    return (
        <>
            <div className='flex'>
                <TextField
                    id={PHONE_INPUT_ID_SEED}
                    key={PHONE_INPUT_ID_SEED}
                    value={context.parameters.value.raw || ""}
                    readOnly={isControlDisabled()}
                    onChange={isControlDisabled() ? undefined : _changeHandler}
                    disabled={isControlDisabled()}
                    onKeyDown={onInputKeyDown}
                    styles={{ root: { width: '100%' } }}

                />
                <IconButton
                    iconProps={{ iconName: 'Phone' }}
                    title="Phone"
                    ariaLabel={PHONE_ACTION_ICON_ID_SEED}
                    disabled={isControlDisabled()}
                    onClick={onClickAction}
                />
            </div>
        </>
    )
}

export default TextFieldComponent;