import Image from "next/image";
import styles from "./page.module.css";
import PostList from "@/components/postList/PostList";
import Parent from "@/components/childrenParent/Parent";
import Child from "@/components/childrenParent/Child";
import SecondChild from "@/components/childrenParent/SecondChild";
import ShapeList from "@/components/exclude/ShapeList";
export default function Home() {
  return (
    <main className={styles.main}>
      {/* <PostList /> */}
      <Parent>
        <Child />
        <SecondChild />
      </Parent>
      <ShapeList />
    </main>
  );
}
