import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const StyledEditor = styled.div`
  .ql-container {
    min-height: 200px;
    font-family: inherit;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .ql-toolbar {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: var(--background-color, #fff);
  }

  .ql-editor {
    min-height: 200px;
    font-size: 14px;
  }

  .ql-snow .ql-stroke {
    stroke: var(--primary-color, #40a9ff);
  }

  .ql-snow .ql-fill {
    fill: var(--primary-color, #40a9ff);
  }

  /* Support for dark mode if applicable */
  [data-theme='dark'] & {
    .ql-toolbar {
      background-color: #1f1f1f;
      border-color: #434343;
    }
    .ql-container {
      border-color: #434343;
    }
    .ql-snow .ql-picker {
      color: #fff;
    }
    .ql-stroke {
      stroke: #fff !important;
    }
  }
`;

interface BaseEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const BaseEditor: React.FC<BaseEditorProps> = ({ value, onChange, placeholder, readOnly }) => {
  const modules = {
    toolbar: readOnly
      ? false
      : [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean']
        ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  return (
    <StyledEditor className={readOnly ? 'read-only' : ''}>
      <ReactQuill
        theme={readOnly ? 'bubble' : 'snow'}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        readOnly={readOnly}
      />
    </StyledEditor>
  );
};

export default BaseEditor;
