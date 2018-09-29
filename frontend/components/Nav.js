import Link from "next/link";

const Nav = () => (
  <div>
    <Link href="/sell">
      <a>Sell stuff</a>
    </Link>
    <Link href="/">
      <a>Back to Home</a>
    </Link>
  </div>
);

export default Nav;
