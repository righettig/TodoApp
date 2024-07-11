"use client";

const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <a
      href="#!"
      className="secondary-content"
      onClick={onClick}
    >
      <i className="material-icons">edit</i>
    </a>
  );

export default EditButton;
