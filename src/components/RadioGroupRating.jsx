import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function RadioGroupRating({ onConfidenceSubmit }) {
  const [value, setValue] = React.useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    setFeedbackSubmitted(true);
    if (onConfidenceSubmit) {
      onConfidenceSubmit(newValue);
    }
  };

  return (
    <div>
      <StyledRating
        name="confidence-rating"
        defaultValue={null}
        value={value}
        IconContainerComponent={IconContainer}
        getLabelText={(val) => customIcons[val].label}
        highlightSelectedOnly
        onChange={handleRatingChange}
      />
    </div>
  );
}

RadioGroupRating.propTypes = {
  onConfidenceSubmit: PropTypes.func,
};
