/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import marked from 'marked';

const Markdown = () => {
  const [text, onChangeText] = useState('');
  const [html, onSetHtml] = useState('');

  useEffect(() => {
    onSetHtml(marked(text));
  }, [text]);

  const onChange = (e) => onChangeText(e.target.value);

  return (
    <div>
      <textarea value={text} cols="30" rows="10" onChange={onChange} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Markdown;
