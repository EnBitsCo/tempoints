import { 
    Image,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid,
    Platform
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import PropTypes from 'prop-types';
import React from 'react';
import { check, PERMISSIONS } from 'react-native-permissions';

import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends React.Component {
    loading = false;
    cursor = null;

    static propTypes = {
        onPressImage: PropTypes.func,
    };

    static defaultProps = {
        onPressImage: () => {},
    };

    state = {
        images: [],
    };

    componentDidMount() {
        this.getImages();
    }

    getImages = async (after) => {
        //const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        //const { status } = await PermissionsAndroid.check(permission);
        
        const permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        await check(permission).then((result) => {
            console.log("Camera roll permission result: ", result);

            if(result !== 'granted') {
                console.log('Camera roll permission denied');
                return;
            }
        });

        if(this.loading) {
            return;
        }

        this.loading = true;

        const results = await CameraRoll.getPhotos({
            first: 20,
            after,
        });

        const { edges, page_info: { has_next_page, end_cursor } } = results;

        const loadedImages = edges.map(item => item.node.image);

        this.setState(
            {
                images: this.state.images.concat(loadedImages),
            },
            () => {
                this.loading = false;
                this.cursor = has_next_page ? end_cursor : null;
            },
        );
    };

    getNextImages = () => {
        if(!this.cursor) {
            return;
        }

        this.getNextImages(this.cursor);
    };

    renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
        const { onPressImage } = this.props;

        const style = {
            width: size,
            height: size,
            marginLeft,
            marginTop,
        };

        return (
            <TouchableOpacity
                key={uri}
                activeOpacity={0.75}
                onPress={() => onPressImage(uri)}
                style={style}
            >
                <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
        );
    };

    render() {
        const { images } = this.state;

        return (
            <Grid
                data={images}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
                onEndReached={this.getNextImages}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
});