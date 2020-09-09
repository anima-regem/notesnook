import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SIZE } from '../../common/common';
import { useTracked } from '../../provider';
import { ACTIONS } from '../../provider/actions';
import { getElevation } from '../../utils/utils';
import { PressableButton } from '../PressableButton';

const SelectionWrapper = ({
  children,
  item,
  currentEditingNote,
  index,
  background,
  pinned,
  onLongPress,
  onPress
}) => {
  const [state, dispatch] = useTracked();
  const {colors, selectionMode, selectedItemsList} = state;
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    let exists = selectedItemsList.filter(
      (o) => o.dateCreated === item.dateCreated,
    );

    if (exists[0]) {
      if (!selected) {
        setSelected(true);
      }
    } else {
      if (selected) {
        setSelected(false);
      }
    }
  }, [selectedItemsList]);






  return (
    <PressableButton
      color={currentEditingNote === item.dateCreated || pinned
        ? colors.shade
        : background
        ? background
        : 'transparent'
      }
      onLongPress={onLongPress}
      onPress={onPress}
      selectedColor={currentEditingNote === item.dateCreated || pinned? colors.accent :  colors.nav}
      alpha={!colors.night ? -0.02 : 0.02}
      opacity={ currentEditingNote === item.dateCreated || pinned? 0.12 : 1}
      customStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 12,
        marginTop:
          index === 0 && pinned && !selectionMode
            ? 15
            : index === 0 && pinned && selectionMode
            ? 30
            : 0,
      }}>
      {pinned ? (
        <View
          style={{
            ...getElevation(3),
            width: 30,
            height: 30,
            backgroundColor: colors.accent,
            borderRadius: 100,
            position: 'absolute',
            right: 20,
            top: -15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: 'white',
              borderRadius: 100,
            }}
          />
        </View>
      ) : null}

      <View
        style={{
          display: selectionMode ? 'flex' : 'none',
          opacity: selectionMode ? 1 : 0,
          width: '10%',
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 8,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            dispatch({type: ACTIONS.SELECTED_ITEMS, item: item});
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 70,
          }}>
          <Icon
            size={SIZE.lg}
            color={selected ? colors.accent : colors.icon}
            name={
              selected
                ? 'check-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
          />
        </TouchableOpacity>
      </View>

      {children}
    </PressableButton>
  );
};

export default SelectionWrapper;
