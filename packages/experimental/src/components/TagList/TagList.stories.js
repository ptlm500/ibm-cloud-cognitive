//
// Copyright IBM Corp. 2020, 2020
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import TagList from './TagList';
import { Tag } from 'carbon-components-react';

import styles from './_index.scss';

export default {
  title: 'Experimental/TagList',
  component: TagList,
  parameters: { styles },
  argTypes: {
    tagCount: {
      control: {
        type: 'number',
      },
    },
    width: {
      control: {
        type: 'number',
      },
    },
  },
};

const Template = (args) => {
  const { tagCount, ...rest } = args;

  const tags = generateTags(tagCount);

  return (
    <div style={{ width: args.width, height: '100px' }}>
      <TagList {...rest}>{tags}</TagList>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  tagCount: 4,
  width: 200,
};

const generateTags = (tagCount) => {
  const tags = [];

  for (let i = 0; i < tagCount; i++) {
    tags.push(<Tag key={i}>{`Tag ${i + 1}`}</Tag>);
  }

  return tags;
};
