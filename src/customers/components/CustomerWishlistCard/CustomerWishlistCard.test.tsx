import { type CustomerDetailsQuery } from "@dashboard/graphql";
import Wrapper from "@test/wrapper";
import { render, screen, within } from "@testing-library/react";

import { customer } from "../../fixtures";
import { CustomerWishlistCard } from "./CustomerWishlistCard";

type Customer = CustomerDetailsQuery["user"];

const savedItem = {
  __typename: "WishlistItem" as const,
  id: "V2lzaGxpc3RJdGVtOjE=",
  createdAt: "2026-11-01T10:00:00+00:00",
  product: { __typename: "Product" as const, id: "UHJvZHVjdDox", name: "Canvas Tote" },
  variant: {
    __typename: "ProductVariant" as const,
    id: "UHJvZHVjdFZhcmlhbnQ6MQ==",
    name: "Natural / Large",
    sku: "TOTE-NAT-L",
  },
};

const renderCard = (customerValue: Customer | undefined): ReturnType<typeof render> =>
  render(
    <Wrapper>
      <CustomerWishlistCard customer={customerValue} />
    </Wrapper>,
  );

const withWishlist = (wishlist: unknown[] | null): Customer =>
  ({ ...customer, wishlist }) as unknown as Customer;

describe("CustomerWishlistCard", () => {
  it("lists each saved product with its variant and shows the Read only badge", () => {
    // Arrange / Act
    renderCard(withWishlist([savedItem]));

    // Assert
    expect(screen.getByText("Wishlist")).toBeInTheDocument();
    expect(screen.getByText("Read only")).toBeInTheDocument();

    const items = screen.getAllByTestId("customer-wishlist-item");

    expect(items).toHaveLength(1);
    expect(within(items[0]).getByText("Canvas Tote")).toBeInTheDocument();
    expect(within(items[0]).getByText("Natural / Large")).toBeInTheDocument();
  });

  it("shows the empty state when the customer has no saved products", () => {
    // Arrange / Act
    renderCard(withWishlist([]));

    // Assert
    expect(screen.getByTestId("customer-wishlist-empty")).toHaveTextContent("No saved products");
    expect(screen.queryByTestId("customer-wishlist-item")).not.toBeInTheDocument();
  });

  it("treats a null wishlist as empty, not as an error", () => {
    // Arrange / Act
    renderCard(withWishlist(null));

    // Assert
    expect(screen.getByTestId("customer-wishlist-empty")).toHaveTextContent("No saved products");
  });

  it("shows a skeleton while the customer is loading instead of the empty state", () => {
    // Arrange / Act
    renderCard(undefined);

    // Assert
    expect(screen.queryByTestId("customer-wishlist-empty")).not.toBeInTheDocument();
    expect(screen.queryByText("No saved products")).not.toBeInTheDocument();
  });

  it("renders no buttons, inputs or form controls", () => {
    // Arrange / Act
    const { container } = renderCard(withWishlist([savedItem]));

    // Assert
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(container.querySelector("input, select, textarea, button")).toBeNull();
  });
});
