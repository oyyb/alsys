import { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

// interface EditorValue {
//     html?: string;
// }

interface PriceInputProps {
    id?: string;
    value?: string;
    onChange?: (value?: string) => void;
}

const MyEditor = (props: PriceInputProps) => {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法

    // 编辑器内容
    const [html, setHtml] = useState<string>()

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',
    }

    const triggerChange = (html?: string) => {
        props.onChange?.(html);
    };

    const onHTMLChange = (e: IDomEditor) => {
        const html = e.getHtml()
        setHtml(html)
        triggerChange(html);
    };

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <div id={props.id} style={{ border: '1px solid #ccc', zIndex: 100 }}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={props.value || html}
                onCreated={setEditor}
                onChange={onHTMLChange}
                mode="default"
                style={{ height: '300px', overflowY: 'hidden' }}
            />
        </div>
    )
}

export default MyEditor