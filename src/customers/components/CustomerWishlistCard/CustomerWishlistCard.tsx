import { DetailSettingsCard } from "@dashboard/components/DetailSettingsCard/DetailSettingsCard";
import { Pill } from "@dashboard/components/Pill/Pill";
import { type CustomerDetailsQuery } from "@dashboard/graphql";
import { Box, Skeleton, Text } from "@saleor/macaw-ui-next";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";

interface CustomerWishlistCardProps {
  customer?: CustomerDetailsQuery["user"] | null;
}

export const CustomerWishlistCard = ({ customer }: CustomerWishlistCardProps): JSX.Element => {
  const intl = useIntl();
  const loading = !customer;
  const items = customer?.wishlist ?? [];

  return (
    <DetailSettingsCard
      data-test-id="customer-wishlist"
      title={
        <FormattedMessage
          defaultMessage="Wishlist"
          description="customer detail sidebar, section header"
          id="6etcxN"
        />
      }
      headerEnd={
        <Pill
          color="neutral"
          label={intl.formatMessage({
            defaultMessage: "Read only",
            description: "customer detail wishlist card, badge",
            id: "KQ+C+c",
          })}
        />
      }
    >
      {loading ? (
        <Skeleton data-test-id="customer-wishlist-loading" __width="160px" __height="20px" />
      ) : items.length === 0 ? (
        <Text size={2} color="default2" data-test-id="customer-wishlist-empty">
          <FormattedMessage
            defaultMessage="No saved products"
            description="customer detail wishlist card, empty state"
            id="l3w9wf"
          />
        </Text>
      ) : (
        <Box as="ul" display="flex" flexDirection="column" gap={3} margin={0} padding={0}>
          {items.map(item => (
            <Box
              as="li"
              key={item.id}
              display="flex"
              flexDirection="column"
              data-test-id="customer-wishlist-item"
            >
              <Text size={2} fontWeight="medium">
                {item.product.name}
              </Text>
              {item.variant.name ? (
                <Text size={2} color="default2">
                  {item.variant.name}
                </Text>
              ) : null}
              <Text size={1} color="default2">
                <FormattedMessage
                  defaultMessage="Saved {date}"
                  description="customer detail wishlist card, date a product was saved"
                  id="0Lv9mn"
                  values={{
                    date: (
                      <FormattedDate
                        value={item.createdAt}
                        year="numeric"
                        month="short"
                        day="numeric"
                      />
                    ),
                  }}
                />
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </DetailSettingsCard>
  );
};

CustomerWishlistCard.displayName = "CustomerWishlistCard";
