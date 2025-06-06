interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className=" h-screen bg-foreground ">{children}</div>;
};

export default Layout;
