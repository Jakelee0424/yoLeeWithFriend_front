import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "보충제1",
    icon: "bi bi-bell",
    color: "primary",
    date: "6",
  },
  {
    title: "보충제2",
    icon: "bi bi-person",
    color: "info",
    date: "5",
  },
  {
    title: "보충제3",
    icon: "bi bi-hdd",
    color: "danger",
    date: "4",
  },
  {
    title: "보충제4",
    icon: "bi bi-bag-check",
    color: "success",
    date: "3",
  },
  {
    title: "보충제5",
    icon: "bi bi-bell",
    color: "dark",
    date: "2",
  },
  {
    title: "보충제6",
    icon: "bi bi-hdd",
    color: "warning",
    date: "1",
  },
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">인기 리뷰 보충제</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          리뷰 수
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
