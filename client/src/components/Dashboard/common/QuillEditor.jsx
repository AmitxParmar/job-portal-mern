import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";

const QuillEditor = ({
  value,
  onChange,
  placeholder,
  theme = "snow",
  modules = {},
  readOnly = false,
  className,
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
    <div className="">
      <ReactQuill
        className={className}
        theme={theme}
        modules={mergedModules}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        {...props}
      />
    </div>
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
  className: PropTypes.string,
};

export default QuillEditor;
