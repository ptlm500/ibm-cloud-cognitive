//
// Copyright IBM Corp. 2020, 2020
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { Tag, Tooltip } from 'carbon-components-react';
import PropTypes from 'prop-types';
import { expPrefix } from '../../global/js/settings';

const TAG_MARGIN = 8;
const TAG_PADDING = 16;
const OVERFLOW_WIDTH = 50;

export default function TagList(props) {
  const { width, children } = props;

  const numberOfTagsToRender = getNumberOfTagsToRender(children, width);

  const overflowItemCount = children.length - numberOfTagsToRender;

  const overflowTags = children.slice(
    children.length - overflowItemCount,
    children.length
  );

  return (
    <div className={`${expPrefix}--tag-list`}>
      {children
        .slice(0, numberOfTagsToRender)
        .map((child, idx) => React.cloneElement(child, { key: idx }))}
      {overflowTags.length > 0 ? (
        <OverflowIndicator overflowItemCount={overflowTags.length}>
          {overflowTags}
        </OverflowIndicator>
      ) : null}
    </div>
  );
}

TagList.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
};

export function OverflowIndicator(props) {
  const { overflowItemCount, children } = props;

  return (
    <Tooltip
      renderIcon={React.forwardRef(function OverflowIndicatorIcon(_, ref) {
        return <Tag ref={ref}>{`+ ${overflowItemCount}`}</Tag>;
      })}>
      {children}
    </Tooltip>
  );
}

OverflowIndicator.propTypes = {
  children: PropTypes.node.isRequired,
  overflowItemCount: PropTypes.number.isRequired,
};

function getNumberOfTagsToRender(tags, width) {
  let remainingWidth = width;
  let tagsToRender = 0;
  for (let i = 0; i < tags.length; i++) {
    const tagWidth =
      TAG_MARGIN + TAG_PADDING + getTextWidth(tags[i].props.children);
    remainingWidth -= tagWidth;
    if (remainingWidth > OVERFLOW_WIDTH) {
      tagsToRender++;
    } else {
      break;
    }
  }

  return tagsToRender;
}

function getTextWidth(text, font = '12px IBM Plex Sans') {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}
