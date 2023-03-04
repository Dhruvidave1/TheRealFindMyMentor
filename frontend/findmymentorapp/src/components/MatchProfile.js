import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function MatchProfile({ person }) {
  const {
    firstName,
    lastName,
    email,
    workLocation,
    isMentor,
    isMentee,
    yearsOfPractice,
    designation,
    zone,
    areasInterest,
    mentorshipGoals
  } = person;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={person.image} />
      <Card.Body>
        <Card.Title>{firstName} {lastName}</Card.Title>
        <Card.Text>
          {`${yearsOfPractice} ${designation}, ${workLocation}`}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Areas of Interest: {areasInterest.join(', ')}</ListGroup.Item>
        <ListGroup.Item>Mentorship Goals: {mentorshipGoals.join(', ')}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={`mailto:${email}`}>Contact</Card.Link>
        {isMentor && <Card.Text>Mentor</Card.Text>}
        {isMentee && <Card.Text>Mentee</Card.Text>}
        <Card.Text>Zone: {zone}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MatchProfile;
