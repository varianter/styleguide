import style from './style.module.css';
type BoxProperties = {
  color: string;
  position: `${VerticalPosition}-${HorizontalPosition}`;
};

type BoxSize = 'small' | 'medium' | 'large' | number;
type VerticalPosition = 'top' | 'topish' | 'middle' | 'bottomish' | 'bottom';
type HorizontalPosition = 'left' | 'leftish' | 'middle' | 'rightish' | 'right';

export interface DecorativeBoxesProps
  extends React.ComponentPropsWithoutRef<any> {
  children: JSX.Element;
  boxSize: BoxSize;
  box1Properties: BoxProperties;
  box2Properties: BoxProperties;
}

/*
Incomplete todo-list:
TODO: Implement random default colors
TODO: Implement optional photo text
TODO: Investigate if it is easier/more consistent
 to just pass bottom/right as styling instead of 
 translating to top/left every time
*/

const DecorativeBoxes: React.FC<DecorativeBoxesProps> = ({
  children,
  boxSize,
  box1Properties,
  box2Properties,
}) => {
  return (
    <div className={style['main-container']}>
      <div
        className={style['decorative-box']}
        style={{
          width: getNumericalBoxSize(boxSize) + '%',
          backgroundColor: box1Properties.color,
          left:
            calculateDistanceToSide(
              getNumericalBoxSize(boxSize),
              box1Properties.position,
              'left'
            ) + '%',
          top:
            calculateDistanceToSide(
              getNumericalBoxSize(boxSize),
              box1Properties.position,
              'top'
            ) + '%',
        }}
      />
      <div
        className={style['decorative-box']}
        style={{
          width: getNumericalBoxSize(boxSize) + '%',
          backgroundColor: box2Properties.color,
          left:
            calculateDistanceToSide(
              getNumericalBoxSize(boxSize),
              box2Properties.position,
              'left'
            ) + '%',
          top:
            calculateDistanceToSide(
              getNumericalBoxSize(boxSize),
              box2Properties.position,
              'top'
            ) + '%',
        }}
      />
      <div className={style['child-container']}>{children}</div>
    </div>
  );
};

export default DecorativeBoxes;

function calculateDistanceToSide(
  boxSize: number,
  positionString: string,
  distanceToCalculate: 'top' | 'left'
) {
  const positionAsString =
    distanceToCalculate === 'top'
      ? positionString.split('-')[0]
      : positionString.split('-')[1];
  switch (positionAsString) {
    case 'left':
    case 'top':
      return 0;
    case 'leftish':
    case 'topish':
      return 25 - boxSize / 4;
    case 'middle':
      return 50 - boxSize / 2;
    case 'rightish':
    case 'bottomish':
      return 75 - boxSize * 0.75;
    case 'right':
    case 'bottom':
      return 100 - boxSize;
  }
  // Fallback
  return 0;
}

function getNumericalBoxSize(boxSize: BoxSize): number {
  switch (boxSize) {
    case 'small':
      return 40;
    case 'medium':
      return 50;
    case 'large':
      return 60;
    default:
      return boxSize;
  }
}

{
  /*
// ---------------------------------------------
// TODO: Everything under this line is kinda unneeded?

interface BoxPosition {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

function getInlineStyle(
  boxSize: number,
  color: string,
  positionTop: number,
  positionLeft: number
) {
  return {
    width: boxSize + '%',
    'background-color': color,
    left: positionTop + '%',
    top: positionLeft + '%',
  };
}

function getPosition(
  boxSize: number,
  randomPosition: BoxPosition,
  rawPosition?: BoxPosition
) {
  if (positionInfoIsSufficient(rawPosition)) {
    return convertPosition(boxSize, rawPosition);
  } else {
    return convertPosition(boxSize, randomPosition);
  }
}

// Converts position values from uncertain top/right/bottom/left-format 
// to a guaranteed top/left-format 
function convertPosition(boxSize: number, rawPosition?: BoxPosition) {
  if (positionInfoIsSufficient(rawPosition)) {
    // if-statement should guarantee rawPosition exists and has sufficient info
    // I imagine there is a better way to do this..?
    return {
      top:
        rawPosition!.top !== undefined
          ? rawPosition!.top
          : 100 - rawPosition!.bottom! - boxSize,
      left:
        rawPosition!.left !== undefined
          ? rawPosition!.left
          : 100 - rawPosition!.right! - boxSize,
    };
  } else {
    return {
      top: 0,
      left: 0,
    };
  }
}

function createRandomPosition(boxSize: number) {
  // Sections ensure boxes aren't generated too close to each other
  const box1Section = randInt(8);
  const box2Section = (box1Section + 2 + randInt(5)) % 8;
  console.log(
    'Box1 section: ' + box1Section + ', box2 section: ' + box2Section
  );

  return [
    createPositionFromSection(box1Section, boxSize),
    createPositionFromSection(box2Section, boxSize),
  ];
}

function createPositionFromSection(section: number, boxSize: number) {
  let rawPosition: BoxPosition = {};
  const distanceFromCorner = randInt(50 - boxSize / 2);
  //  Sections:
  //  0 1
  // 7⌜ ⌝2
  // 6⌞ ⌟3
  //  5 4
  //
  switch (section % 8) {
    case 0:
      rawPosition.top = 0;
      rawPosition.left = distanceFromCorner;
      break;
    case 1:
      rawPosition.top = 0;
      rawPosition.right = distanceFromCorner;
      break;
    case 2:
      rawPosition.top = distanceFromCorner;
      rawPosition.right = 0;
      break;
    case 3:
      rawPosition.bottom = distanceFromCorner;
      rawPosition.right = 0;
      break;
    case 4:
      rawPosition.bottom = 0;
      rawPosition.right = distanceFromCorner;
      break;
    case 5:
      rawPosition.bottom = 0;
      rawPosition.left = distanceFromCorner;
      break;
    case 6:
      rawPosition.bottom = distanceFromCorner;
      rawPosition.left = 0;
      break;
    case 7:
    default:
      rawPosition.top = distanceFromCorner;
      rawPosition.left = 0;
      break;
  }
  return rawPosition;
}

function positionInfoIsSufficient(rawPosition?: BoxPosition) {
  return (
    rawPosition !== undefined &&
    (rawPosition?.top !== undefined || rawPosition?.bottom !== undefined) &&
    (rawPosition?.left !== undefined || rawPosition?.right !== undefined)
  );
}

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}

*/
}
