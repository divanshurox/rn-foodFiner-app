import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  Image,
} from "react-native";

import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";

import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

import { mapDarkStyle, markers } from "../assets/MapDarkStyle";
import { useTheme } from "react-native-paper";
import StarRating from "../components/StarList";
import StarList from "../components/StarList";

const { height, width } = Dimensions.get("window");

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function App() {
  const initialMapState = {
    markers,
    categories: [
      {
        name: "Fastfood Center",
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="food-fork-drink"
            size={18}
          />
        ),
      },
      {
        name: "Restaurant",
        icon: (
          <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      {
        name: "Dineouts",
        icon: (
          <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      {
        name: "Snacks Corner",
        icon: (
          <MaterialCommunityIcons
            name="food"
            style={styles.chipsIcon}
            size={18}
          />
        ),
      },
      {
        name: "Hotel",
        icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
    ],
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = useState(initialMapState);
  const theme = useTheme();
  let _map = useRef(null);
  let _scrollView = useRef(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = mapAnimation.interpolate({
      inputRange: inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });
    return { scale };
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.map}
        customMapStyle={theme.dark ? mapDarkStyle : []}
      >
        {state.markers.map((ele, i) => {
          const scaleStyles = {
            transform: [
              {
                scale: interpolations[i].scale,
              },
            ],
          };
          return (
            <Marker
              key={i}
              coordinate={ele.coordinate}
              title={ele.title}
              description={ele.description}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../assets/marker.png")}
                  style={[styles.marker, scaleStyles]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          top: 0,
          left: 0,
          right: 20,
          bottom: 0,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        {state.categories.map((ele, i) => {
          return (
            <TouchableOpacity key={i} style={styles.chipsItem}>
              {ele.icon}
              <Text>{ele.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentContainerStyle={{
          paddingHorizontal: SPACING_FOR_CARD_INSET,
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: mapAnimation,
              },
            },
          },
        ])}
      >
        {state.markers.map((ele, i) => {
          return (
            <View style={styles.card} key={i}>
              <Image
                source={ele.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {ele.title}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {ele.description}
                </Text>
                <StarList number={ele.rating} review={ele.reviews} />
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: height,
    width: width,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
