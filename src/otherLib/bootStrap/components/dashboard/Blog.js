import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const fallbackImage = "/images/default.png"; // 대체 이미지

const normalizePath = (path) => path.replace(/\\/g, "/");

const resolveImageUrl = (imgUrl) => {
  if (!imgUrl) return fallbackImage;

  const normalized = normalizePath(imgUrl);
  const publicIndex = normalized.indexOf("public");

  if (publicIndex !== -1) {
    const relativePath = normalized.slice(publicIndex + "public".length);
    return process.env.PUBLIC_URL + relativePath;
  }

  return process.env.PUBLIC_URL + normalized;
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
