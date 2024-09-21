import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import PropTypes from "prop-types";

const QuillEditor = ({
  value,
  onChange,
  placeholder,
  theme = "snow",
  modules = {},
  formats = [],
  readOnly = false,
  ...props
}) => {
  const defaultModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const mergedModules = { ...defaultModules, ...modules };

  return (
    <ReactQuill
      theme={theme}
      modules={mergedModules}
      formats={formats}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      {...props}
    />
  );
};

QuillEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  modules: PropTypes.object,
  formats: PropTypes.array,
  readOnly: PropTypes.bool,
};

export default QuillEditor;
