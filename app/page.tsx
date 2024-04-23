import Link from "next/link";
import RepositoryCard from "./components/RepositoryCard";
import UserProfile from "./components/UserProfile";
import styles from "./page.module.scss";
import { GithubProfileType } from "./types/GithubProfileType";
import { GithubReposType } from "./types/GithubReposType";

export default async function Home() {
  const response = await fetch("https://api.github.com/users/rafaelmontgomery");
  const data: GithubProfileType = await response.json();

  const responseRepos = await fetch(
    `http://api.github.com/users/${data.login}/repos`
  );

  const dataRepos: GithubReposType[] = await responseRepos.json();

  return (
    <main className={styles.main}>
      <UserProfile isMyProfile profile={data} />
      <div>
        <Link href="/search-users">
          <button className="btn--green">Encontrar Usuários</button>
        </Link>

        <div className={styles["container-projects"]}>
          {dataRepos.map((repo) => (
            <RepositoryCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
