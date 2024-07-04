

export const LazyImage = ({ uri }) => (
    <FastImage
      style={{ width: width, height: 200 }}
      source={{ uri }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );