import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { Banner } from '../../../data/models/response/Banner';

const { width } = Dimensions.get('window');

interface BannerProps {
  banners: Banner[];
}

export default function Carousel({ banners }: BannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const intervalRef = useRef<any>(null);

  const onScroll = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / (width * 0.8));
    setActiveIndex(index);
  };

  const scrollToNext = () => {
    if (banners.length > 0) {
      const nextIndex = (activeIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }
  };

  useEffect(() => {
    if (banners.length > 0) {
      intervalRef.current = setInterval(() => {
        scrollToNext();
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [activeIndex, banners]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            {item.url ? (
              <Image source={{ uri: item.url }} style={styles.image} />
            ) : (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>No Image Available</Text>
              </View>
            )}
          </View>
        )}
        snapToAlignment="start"
        snapToInterval={width * 0.8 + 20}
        decelerationRate="fast"
        onScroll={onScroll}
        pagingEnabled={false}
      />

      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#67C4A7' : '#ccc',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 16,
  },
  imageContainer: {
    width: width * 0.8,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  placeholderContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});