import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const fallbackImage = process.env.PUBLIC_URL + "/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";


const normalizePath = (path) => path.replace(/\\/g, "/");

const resolveImageUrl = (imgUrl) => {
  
  if (!imgUrl) return fallbackImage;

  const normalized = normalizePath(imgUrl);
  console.log(normalized)
  const publicIndex = normalized.indexOf("public");
  console.log(publicIndex)
  if (publicIndex !== -1) {
    const relativePath = normalized.slice(publicIndex + "public".length);
    return process.env.PUBLIC_URL + relativePath;
  } else {
    const imgIndex = normalized.indexOf("/img");
    if (imgIndex !== -1) {
      const relativeImgPath = normalized.slice(imgIndex); // "/img/..." 만 남김
      return `${relativeImgPath}`; // 앞에 '/' 붙이면 상대경로
    } else if (
      normalized.startsWith("blob:") ||
      normalized.startsWith("data:") // base64 데이터도 처리
    ) {
      return normalized; // 그대로 리턴
    } else {
      // fallback 처리
      return fallbackImage;
    }
  }
};

const Blog = (props) => {
  const image = resolveImageUrl(props.image);
  return (
    <Card>
      <CardImg alt="Card image cap" src={image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3">{props.text}</CardText>
      </CardBody>
    </Card>
  );
};

export default Blog;
