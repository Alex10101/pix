// import React from 'react';
import { connect } from 'react-redux';
import { doVoidAction } from 'store/actions/void';

/**
 * @return {string}
 */
function Account({ Void, doVoid }) {
  console.log(Void);
  doVoid(true);
  return '';
}

const mapStateToProps = ({ Void }) => ({ Void });
const mapDispatchToProps = { doVoid: doVoidAction };

export default connect(mapStateToProps, mapDispatchToProps)(Account);
