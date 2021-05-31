import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ColorPropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import colors from '../utils/colors';

export default function ProductoThumbnail({
    name,
    tempoints,
    avatar,
    textColor,
    onPress,
}) {
    const colorStyle = {
        color: textColor,
    };
    const ImageComponent = onPress ? TouchableOpacity : View;

    return (
        <View style={styles.container}>
            <ImageComponent onPress={onPress}>
                <Image
                    source={{
                        uri: avatar,
                    }}
                    style={styles.avatar}
                />
            </ImageComponent>
            {name !== '' && <Text style={[styles.name, colorStyle]}>{name}</Text>}

            {tempoints !== '' && (
                <View style={styles.tempointsSection}>
                    <Icon name="hourglass-half" size={16} style={{ color: textColor }} />
                    <Text style={[styles.tempoints, colorStyle]}>{tempoints}</Text>
                </View>
            )}
        </View>
    );
}

ProductoThumbnail.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    tempoints: PropTypes.string,
    textColor: ColorPropType,
    onPress: PropTypes.func,
};

ProductoThumbnail.defaultProps = {
    name: '',
    tempoints: '',
    textColor: 'white',
    onPress: null,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    },
    name: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    tempointsSection: {
        flexDirection: 'row',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempoints: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
