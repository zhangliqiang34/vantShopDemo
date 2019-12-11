<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="(thumb,index) in goods.thumb" :key="index">
        <img v-lazy="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-row type="flex" justify="space-between">
          <van-col >运费：{{ goods.express }}</van-col>
          <van-col >{{ goods.sale }}人付款</van-col>
          <van-col >{{ goods.city }}</van-col>
        </van-row>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="show=true">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
    
    <van-sku
    v-model="show"
    :sku="goodsSku"
    :goods="goodsInfo"
    :goods-id="goods.id"
    :quota="goods.quota"
    :quota-used="goods.quotaUsed"
    :hide-stock="goodsSku.hide_stock"
    @buy-clicked="onBuyClicked"
    @add-cart="onAddCartClicked"
  />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import {
  Dialog,
  Sku,
  Tag,
  Col,
  Row,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  Notify,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from "vant";

export default {
  components: {
    [Sku.name]: Sku,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },

  data() {
    return {
      show: false
      // goods: {
      //   title: '美国伽力果（约680g/3个）',
      //   price: 2680,
      //   express: '免运费',
      //   remain: 19,
      //   thumb: [
      //     'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
      //     'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
      //   ]
      // }
    };
  },
  computed: {
    ...mapState("detail", {
      goods: state => state.goodsDetail,
      goodsSku: state => state.goodsSku
    }),
    ...mapGetters("detail", ["goodsInfo"])
  },
  created() {
    this.$store
      .dispatch("detail/getGoodsDetail", this.$route.params.id)
      .catch(() => {
        Notify("获取失败");
      });
    this.$store
      .dispatch("detail/getGoodsSku", this.$route.params.id)
      .catch(() => {
        Notify("获取失败");
      });
  },
  methods: {
    formatPrice() {
      return "¥" + (this.goods.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push("/cart");
    },

    sorry() {
      Toast("暂无后续逻辑~");
    },
    onBuyClicked(skuData) {},
    onAddCartClicked(skuData) {
      this.$store
        .dispatch("detail/addToCart", skuData)
        .then(() => {
          Toast.success("添加购物车成功");
          this.show = false;
          Dialog.confirm({
            title: "",
            message: "是否添加到购物车"
          }).then(() => {
            // on confirm
            this.$router.push("/cart");
          });
        })
        .catch(() => {
          Toast.fail("添加购物车失败");
        });
    }
  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
