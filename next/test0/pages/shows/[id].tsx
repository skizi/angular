import Link from "next/link";
import fetch from "isomorphic-unfetch"; //SSRでも動作するfetch


type Props = {
  show : {
    name : string,
    summary : string,
    image : {
      medium : string
    }
  }
}

const Post: React.FC<Props> = props => (
  <div>
    <style jsx>
      {`
        .return-btn{
          display:block;
        }
      `}
    </style>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?[pb]>/g, "")}</p>
    {props.show.image ? <img src={props.show.image.medium} /> : null}
    <Link href="/show_top">
      <a className="return-btn">一覧に戻る</a>
    </Link>
  </div>
);


export const getStaticPaths = async () => {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman")
  const data:any[] = await res.json()
  // レポジトリの名前をパスとする
  // const paths = data.map(entry => `/shows/${entry.show.id}`)
  const paths = data.map( entry => ({ params: { id: entry.show.id + "" } }))
  // 事前ビルドしたいパスをpathsとして渡す fallbackについては後述
  return { paths, fallback: false }
}


export const getStaticProps = async (context:any) => {
  const id = context.params.id;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show:any = await res.json();
  return { props : { show } };
};

export default Post;