import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Text } from "react-native-elements";

const data = [
  {
    title: 'Đại sảnh',
    id: '1',
    slug: '#slug.1',
    child: [
      {
        title: 'Thông báo',
        id: '2',
        slug: ''
      },
      {
        title: 'Góp ý',
        id: '3',
        slug: ''
      }
    ]
  },
  {
    title: 'Máy tính',
    id: '5',
    slug: '#slug.5',
    child: [
      {
        title: 'Tư vấn cấu hình',
        id: '70',
        slug: ''
      },
      {
        title: 'Overclocking & Cooling & Modding',
        id: '6',
        slug: ''
      },
      {
        title: 'AMD',
        id: '25',
        slug: ''
      },
      {
        title: 'Intel',
        id: '24',
        slug: ''
      },
      {
        title: 'GPU & Màn hình',
        id: '8',
        slug: ''
      },
      {
        title: 'Phần cứng chung',
        id: '9',
        slug: ''
      },
      {
        title: 'Thiết bị ngoại vi & Phụ kiện & Mạng',
        id: '30',
        slug: ''
      },
      {
        title: 'Server / NAS / Render Farm',
        id: '83',
        slug: ''
      },
      {
        title: 'Small Form Factor PC',
        id: '61',
        slug: ''
      },
      {
        title: 'Hackintosh',
        id: '62',
        slug: ''
      },
      {
        title: 'Máy tính xách tay',
        id: '47',
        slug: ''
      },
    ]
  },
  {
    title: 'Phần mềm & Games',
    id: '20',
    slug: '#slug.20',
    child: [
      {
        title: 'Phần mềm',
        id: '13',
        slug: ''
      },
      {
        title: 'App di động',
        id: '21',
        slug: ''
      },
      {
        title: 'PC Gaming',
        id: '11',
        slug: ''
      },
      {
        title: 'Console Gaming',
        id: '22',
        slug: ''
      },
    ]
  },
  {
    title: 'Sản phẩm công nghệ',
    id: '46',
    slug: '#slug.5',
    child: [
      {
        title: 'Android',
        id: '32',
        slug: ''
      },
      {
        title: 'Apple',
        id: '36',
        slug: ''
      },
      {
        title: 'Multimedia',
        id: '31',
        slug: ''
      },
      {
        title: 'Đồ điện tử & Thiết bị gia dụng',
        id: '10',
        slug: ''
      },
      {
        title: 'Chụp ảnh & Quay phim',
        id: '75',
        slug: ''
      },
    ]
  },
  {
    title: 'Khu vui chơi giải trí',
    id: '16',
    slug: '#slug.16',
    child: [
      {
        title: 'Chuyện trò linh tinh™',
        id: '17',
        slug: ''
      },
      {
        title: 'Điểm báo',
        id: '33',
        slug: ''
      },
      {
        title: '4 bánh',
        id: '38',
        slug: ''
      },
      {
        title: '2 bánh',
        id: '39',
        slug: ''
      },
      {
        title: 'Thể dục thể thao',
        id: '63',
        slug: ''
      },
      {
        title: 'Ẩm thực & Du lịch',
        id: '64',
        slug: ''
      },
      {
        title: 'Phim / Nhạc / Sách',
        id: '65',
        slug: ''
      },
      {
        title: 'Thời trang & Làm đẹp',
        id: '66',
        slug: ''
      },
      {
        title: 'Các thú chơi khác',
        id: '67',
        slug: ''
      },
    ]
  },
  {
    title: 'Khu thương mại',
    id: '84',
    slug: '#slug.84',
    child: [
      {
        title: 'Máy tính để bàn',
        id: '68',
        slug: ''
      },
      {
        title: 'Máy tính xách tay',
        id: '72',
        slug: ''
      },
      {
        title: 'Điện thoại di động',
        id: '76',
        slug: ''
      },
      {
        title: 'Xe các loại',
        id: '77',
        slug: ''
      },
      {
        title: 'Thời trang & Làm đẹp',
        id: '78',
        slug: ''
      },
      {
        title: 'Bất động sản',
        id: '79',
        slug: ''
      },
      {
        title: 'Ăn uống & Du lịch',
        id: '81',
        slug: ''
      },
      {
        title: 'SIM số & Đồ phong thuỷ',
        id: '82',
        slug: ''
      },
      {
        title: 'Sản phẩm & Dịch vụ khác',
        id: '80',
        slug: ''
      },
    ]
  },
];

export default function ForumList(props) {
  return (
    <ScrollView>
      {data.map((group, index) => {
        return (
          <GroupList {...props} data={group} key={index}/>
        )
      })}
    </ScrollView>
  );
}

const GroupList = ({ data, navigation, ...rest }) => {
  const { title, id, child = [] } = data || {};
  return (
    <View>
      <Text h4 h4Style={{
        backgroundColor: 'rgba(4,2,1,0.75)',
        padding: 5,
        paddingLeft: 10,
        fontSize: 20,
        color: '#ffffff'
      }}>{title}</Text>
      <View>
        {
          child.map((item, index) => {
            return (
              <ListItem
                key={index}
                title={item.title}
                subtitle={'8 viewing'}
                bottomDivider
                rightIcon={{ name: 'star-border' }}
                onPress={() => {
                  navigation.navigate('ForumChildScreen', {
                    id: item.id,
                    title: item.title,
                    name: item.title,
                  });
                }}
              />
            )
          })
        }
      </View>
    </View>
  )
};

const Item = ({ data }) => {
  const { title, id, child = [] } = data || {};
  return (
    <View>
      <Text>{title}-{id}</Text>
    </View>
  )
}

ForumList.navigationOptions = {
  header: null,
};
