export interface Name {
    label: string;
}

export interface Uri {
    label: string;
}

export interface Author {
    name: Name;
    uri: Uri;
}

export interface Image {
    label: string;
    attributes: {
        height: string;
    };
}

export interface Summary {
    label: string;
}

export interface Price {
    label: string;
    attributes: {
        amount: string;
        currency: string;
    };
}

export interface ContentType {
    attributes: {
        term: string;
        label: string;
    };
}

export interface Rights {
    label: string;
}

export interface Title {
    label: string;
}

export interface Link {
    attributes: {
        rel: string;
        type: string;
        href: string;
    };
}

export interface Id {
    label: string;
    attributes: {
        "im:id": string;
    };
}

export interface Artist {
    label: string;
    attributes: {
        href: string;
    };
}

export interface Attributes {
    "im:id": string;
    term: string;
    scheme: string;
    label: string;
}

export interface Category {
    attributes: Attributes;
}

export interface ReleaseDate {
    label: string;
    attributes: {
        label: string;
    };
}

export interface PodcastI {
    "im:name": Name;
    "im:image": Image[];
    summary: Summary;
    "im:price": Price;
    "im:contentType": ContentType;
    rights: Rights;
    title: Title;
    link: Link;
    id: Id;
    "im:artist": Artist;
    category: Category;
    "im:releaseDate": ReleaseDate;
}

export interface Feed {
    author: Author;
    entry: PodcastI[];
    updated: {
        label: string;
    };
    rights: {
        label: string;
    };
    title: {
        label: string;
    };
    icon: {
        label: string;
    };
    link: Link[];
    id: {
        label: string;
    };
}

export interface PodcastListResponse {
    feed: Feed;
}
