import * as React from 'react';
import times from 'lodash/times';
import { Button } from "react-native-elements";
import { ScrollView, View } from "react-native";

export default function Pagination({ totalPage = 0, onClick, currentPage = 1, hasBottomNavigation, onClickReply, isAuthen }) {
  const _total = totalPage
  return (
    <View
      style={{
        minHeight: hasBottomNavigation ? 0 : 70,
        display: 'flex',
        backgroundColor: '#15191d'

      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 0.5,
          borderStyle: 'solid',
          borderTopColor: 'rgba(76,76,76,0.62)'
        }}
      >
        <Button
          type="clear"
          icon={
            {
              name: "reply",
              type: 'material',
            }
          }
          disabled={!isAuthen}
          onPress={() => onClickReply(true)}
        />
        {
          totalPage > 1 && <Button
            icon={
              {
                name: "first-page",
                type: 'material',
              }
            }
            type="clear"
            onPress={() => onClick(1)}
          />
        }
        <ScrollView
          horizontal={true}
          style={{}}
          showsHorizontalScrollIndicator={false}
        >

          {
            times(_total).map((i) => {
              const p = i + 1;
              return (
                <Button
                  key={p}
                  title={`${p}`}
                  type={currentPage === p ? 'solid' : 'outline'}
                  onPress={() => onClick(p)}
                  buttonStyle={{
                    marginLeft: 3,
                    marginRight: 3,
                    padding: 5,
                    minWidth: 30,

                  }}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: currentPage === p ? 'bold' : 'normal'
                  }}
                />
              )
            })
          }

        </ScrollView>
        {
          totalPage > 1 && <Button
            icon={{
              name: 'last-page'
            }}
            type={'clear'}
            onPress={() => onClick(totalPage)}
          />
        }
        <Button
          type="clear"
          icon={
            {
              name: "share",
              type: 'material',
            }
          }
        />
      </View>
    </View>
  );
}
