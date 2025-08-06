import classes from "./stylecomponent/questioncomp.module.css";
function UserIcon({
  bgColor = "#fff",
  fill = "#09244B",

  ...rest
}) {
  return (
    <svg
      className={classes.svgicon}
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle
        cx="12"
        cy="12"
        r="11.8"
        fill={bgColor}
        stroke="#09244B" // border color
        strokeWidth="0.3"
        style={{ transition: "fill 0.5s ease" }}
      />
      <g
        transform="translate(3.5, 3) scale(0.7)"
        fill={fill}
        style={{ transition: "fill 0.5s ease" }}
      >
        <path d="M15,14 C17.69,14 19.88,16.12 20,18.78V20C20,21.05 19.18,21.92 18.15,22H4C2.95,22 2.08,21.18 2,20V19C2,16.31 4.12,14.12 6.78,14H15Z" />
        <path d="M11,2C13.76,2 16,4.24 16,7C16,9.76 13.76,12 11,12C8.24,12 6,9.76 6,7C6,4.24 8.24,2 11,2Z" />
        <path d="M21,7C21.55,7 22,7.45 22,8C22,8.51 21.61,8.94 21.12,9H18C17.45,9 17,8.55 17,8C17,7.49 17.39,7.06 17.88,7H21Z" />
        <path d="M21,10C21.55,10 22,10.45 22,11C22,11.55 21.55,12 21,12H19C18.45,12 18,11.55 18,11C18,10.45 18.45,10 19,10H21Z" />
        <path d="M21,13C21.55,13 22,13.45 22,14C22,14.55 21.55,15 21,15H20C19.45,15 19,14.55 19,14C19,13.45 19.45,13 20,13H21Z" />
      </g>
    </svg>
  );
}

export default UserIcon;
