"use client";
import styles from "./styles.module.scss";
import UserProfile from "../components/UserProfile";
import RepositoryCard from "../components/RepositoryCard";
import NotFoundImage from "../assets/not-found.svg";
import Image from "next/image";
import { useState } from "react";
import { GithubProfileType } from "../types/GithubProfileType";
import { GithubReposType } from "../types/GithubReposType";
import LoadingComponent from "../components/LoadingComponent";

export default function Home() {
  const [searchInput, setsearchInput] = useState("");
  const [user, setUser] = useState<GithubProfileType | null>(null);
  const [repos, setRepos] = useState<GithubReposType[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearchUser() {
    if (!searchInput) {
      setUser(null);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.github.com/users/${searchInput}`
      );
      const data: GithubProfileType = await response.json();
      setUser(data);

      const responseRepos = await fetch(
        `https://api.github.com/users/${searchInput}/repos`
      );
      const dataRepos: GithubReposType[] = await responseRepos.json();
      setRepos(dataRepos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles["main--search"]}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={searchInput}
          onChange={(event) => setsearchInput(event.target.value)}
        />
        <button className="btn--green" onClick={handleSearchUser}>
          buscar
        </button>
      </div>
      <div className={styles["main--body"]}>
        {loading ? (
          <LoadingComponent />
        ) : user?.name ? (
          <div>
            <UserProfile profile={user} />
            <div>
              <div className={styles["container-projects"]}>
                {repos.slice(0, 6).map((repo) => (
                  <RepositoryCard repo={repo} key={repo.id} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="not-found">
            <Image
              src={NotFoundImage}
              alt="not found"
              width={400}
              height={440}
            />
            <h3>Nenhum usuário foi encontrado</h3>
          </div>
        )}
      </div>
    </main>
  );
}
