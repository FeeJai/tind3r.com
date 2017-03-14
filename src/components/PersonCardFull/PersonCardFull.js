import './PersonCardFull.scss';

import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { compose, withHandlers, withState, pure } from 'recompose';
import cx from 'classnames';
import map from 'lodash/map';
import filter from 'lodash/filter';
import uniqueId from 'lodash/uniqueId';

import Gallery from 'Components/Gallery';
import ActionButtons from 'Components/ActionButtons';

const enhance = compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    startCount: props => () => {
      console.log(props)
      setInterval(() => {
        props.setCounter(n => n + 1)
      }, 1000)
    },
    onActionClick: props => (actionType) => {
      props.person.callAction(actionType)
    }
  })
)

const renderInstagramLink = (link, name, small) => (
  <a href={link} target="_blank" title={name}>
    <i className="fa fa-instagram" />
    {!small && <div className="instaname">{name}</div>}
  </a>
);

const PersonCardFull = ({
  person, small, counter, startCount, onActionClick,
}) => (
  <div className="person-card-full">
    <div className="person-card-full__gallery">
      <Gallery key={person._id} images={person.photos} width={600} />
    </div>
    <div className="person-card-full__content">
      <div className="person-card-full__name">
        <Link to={`/user/${person._id}`}>{person.name}, {person.age}</Link>
      </div>
      <div className="person-card-full__details">
        <h1>{person.distanceKm}, <span>{person.seenMin}</span></h1>
        <h2>Last seen: {person.seen}</h2>
      </div>

      <div className="person-card-full__schools">
        {map(filter(person.schools, s => s.id), s => (
          <a
            href={`http://facebook.com/${s.id}`}
            target="_blank"
            rel="noreferrer noopener"
          >{s.name}</a>
        ))}
      </div>

      <div className="person-card-full__job">
        {_.map(person.job, job => (
          <div key={uniqueId()}>{job}</div>
        ))}
      </div>

      <div className="person-card-full__bio" onClick={startCount}>
        {person.bio && person.bio.split('\n').map(item => (
          <span key={uniqueId()}>
            {item}
            <br />
          </span>
        ))}
      </div>

      <div className="person-card-full__employ">
        <span>{person.school}</span>
        <div className="person-card-full__employ__actions">
          <ActionButtons
            liked={person.is_liked}
            superLikeTimeout={counter}
            onButtonClick={onActionClick}
          />
        </div>
      </div>

      <div className="person-card-full__footer">
        <div className="person-card-full__footer--distance">{person.distanceKm}</div>
        <div className="person-card-full__footer--instagram">
          {
            person.instagramProfileLink ?
            renderInstagramLink(person.instagramProfileLink, person.instagramUsername, small) :
            <i className="fa fa-instagram" />
          }
        </div>
      </div>
    </div>
  </div>
);

export default enhance(observer(PersonCardFull));
