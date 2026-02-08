const baseClass = "mx-auto w-full px-6 md:px-0";

const PageContainer = ({
  as: Component = "div",
  className = "",
  children,
  ...props
}) => (
  <Component className={`${baseClass} ${className}`} {...props}>
    {children}
  </Component>
);

export default PageContainer;
