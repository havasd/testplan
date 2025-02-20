import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import { formatMilliseconds } from './../Common/utils';
import _ from 'lodash';

import {
  RED,
  GREEN,
  ORANGE,
  BLACK,
  CATEGORY_ICONS,
  ENTRY_TYPES,
  STATUS,
  STATUS_CATEGORY,
} from "../Common/defaults";
import { statusStyles } from "../Common/Styles";

/**
 * Display NavEntry information:
 *   * name.
 *   * case count (passed/failed).
 *   * type (displayed in badge).
 */
const NavEntry = (props) => {
  const badgeStyle = `${STATUS_CATEGORY[props.status]}Badge`;
  const executionTime = (
    props.displayTime && _.isNumber(props.executionTime) ? (
      <i className={css(styles.entryIcon)} title='Execution time'>
        <span className={css(styles[STATUS_CATEGORY[props.status]])}>
          {formatMilliseconds(props.executionTime)}
        </span>
      </i>
    ) : null
  );
  return (
    <div
      className='d-flex justify-content-between align-items-center'
      style={{
        height: "1.5em",
        userSelect: "text"
      }}
    >
      <Badge
        className={css(styles.entryIcon, styles[badgeStyle], styles.badge)}
        title={props.type}
        pill
      >
        {CATEGORY_ICONS[props.type]}
      </Badge>
      <div
        className={css(styles.entryName, styles[STATUS_CATEGORY[props.status]])}
        title={`${props.description || props.name} - ${props.status}`}
      >
        {props.name}
      </div>
      <div className={css(styles.entryIcons)}>
        {executionTime}
        <i className={css(styles.entryIcon)} title='passed/failed testcases'>
          <span className={css(styles.passed)}>{props.caseCountPassed}</span>
          /
          <span className={css(styles.failed)}>{props.caseCountFailed}</span>
        </i>
      </div>
    </div>
  );
};

NavEntry.propTypes = {
  /** Entry name */
  name: PropTypes.string,
  /** Entry description */
  description: PropTypes.string,
  /** Entry status */
  status: PropTypes.oneOf(STATUS),
  /** Entry type */
  type: PropTypes.oneOf(ENTRY_TYPES),
  /** Number of passing testcases entry has */
  caseCountPassed: PropTypes.number,
  /** Number of failing testcases entry has */
  caseCountFailed: PropTypes.number,
  /** Execution time measured in seconds */
  executionTime: PropTypes.number,
  /** If to display execution time */
  displayTime: PropTypes.bool,
};

const styles = StyleSheet.create({
  entryName: {
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap",
    fontSize: 'small',
    fontWeight: 500,
    marginLeft: '3px',
    flex: "auto",
  },
  entryIcons: {
    paddingLeft: '1em',
    display: "flex",
    flexShrink: 0,
  },
  entryIcon: {
    fontSize: 'x-small',
    margin: '0em 0.5em 0em 0.5em',
  },
  badge: {
    opacity: 0.5,
  },
  passedBadge: {
    backgroundColor: GREEN,
  },
  failedBadge: {
    backgroundColor: RED,
  },
  errorBadge: {
    backgroundColor: RED,
  },
  unstableBadge: {
    backgroundColor: ORANGE,
  },
  unknownBadge: {
    backgroundColor: BLACK,
  },
  ...statusStyles
});

export default NavEntry;
